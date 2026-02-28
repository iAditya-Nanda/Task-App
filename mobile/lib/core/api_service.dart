import 'package:dio/dio.dart';
import 'storage.dart';

// Service to handle all HTTP communication with the backend
class ApiService {
  final Dio dio = Dio(BaseOptions(
    baseUrl: 'http://localhost:3000', // Standard localhost for adb reverse
    connectTimeout: const Duration(seconds: 5),
    receiveTimeout: const Duration(seconds: 3),
  ));

  final SecureStorage storage = SecureStorage();

  ApiService() {
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await storage.getAccessToken();
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (DioException error, handler) async {
        if (error.response?.statusCode == 401) {
          final refreshToken = await storage.getRefreshToken();
          if (refreshToken != null) {
            try {
              // Attempt to refresh the token
              final response = await dio.post('/auth/refresh', data: {
                'refreshToken': refreshToken,
              });

              if (response.statusCode == 200) {
                final newAccess = response.data['accessToken'];
                final newRefresh = response.data['refreshToken'];
                await storage.saveTokens(newAccess, newRefresh);

                // Retry original request
                final opts = error.requestOptions;
                opts.headers['Authorization'] = 'Bearer $newAccess';
                final retryRes = await dio.fetch(opts);
                return handler.resolve(retryRes);
              }
            } catch (e) {
              await storage.clearTokens();
              // In a real app, logic would trigger a redirect to login here
            }
          }
        }
        return handler.next(error);
      },
    ));
  }
}
