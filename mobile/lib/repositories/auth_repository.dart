import '../core/services/api_service.dart';
import '../core/services/storage_service.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final authRepositoryProvider = Provider((ref) {
  final api = ref.watch(apiServiceProvider);
  final storage = ref.watch(storageServiceProvider);
  return AuthRepository(api, storage);
});

class AuthRepository {
  final ApiService _api;
  final StorageService _storage;

  AuthRepository(this._api, this._storage);

  Future<void> login(String email, String password) async {
    final response = await _api.dio.post('/auth/login', data: {
      'email': email,
      'password': password,
    });

    final access = response.data['accessToken'];
    final refresh = response.data['refreshToken'];
    await _storage.saveTokens(access, refresh);
  }

  Future<void> register(String email, String password) async {
    await _api.dio.post('/auth/register', data: {
      'email': email,
      'password': password,
    });
  }

  Future<void> logout() async {
    await _storage.clearTokens();
  }

  Future<bool> isLoggedIn() async {
    final token = await _storage.getAccessToken();
    return token != null;
  }
}
