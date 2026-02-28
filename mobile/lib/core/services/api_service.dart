import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'storage_service.dart';

final apiServiceProvider = Provider((ref) => ApiService(ref));

class ApiService {
  final Ref _ref;
  final Dio dio = Dio(BaseOptions(
    baseUrl: 'http://localhost:3000', // Use localhost + adb reverse for physical devices
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
  ));

  ApiService(this._ref) {
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final storage = _ref.read(storageServiceProvider);
        final token = await storage.getAccessToken();
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (DioException error, handler) async {
        if (error.response?.statusCode == 401 && !error.requestOptions.path.contains('/auth/refresh')) {
          final storage = _ref.read(storageServiceProvider);
          final refreshToken = await storage.getRefreshToken();
          
          if (refreshToken != null) {
            try {
              final response = await Dio().post(
                '${dio.options.baseUrl}/auth/refresh',
                data: {'refreshToken': refreshToken},
              );

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
              // Trigger logout event or similar
            }
          }
        }
        return handler.next(error);
      },
    ));
  }
}
