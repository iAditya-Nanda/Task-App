import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final secureStorageProvider = Provider((ref) => const FlutterSecureStorage());

class StorageService {
  final FlutterSecureStorage _storage;

  StorageService(this._storage);

  Future<void> saveTokens(String access, String refresh) async {
    await _storage.write(key: 'accessToken', value: access);
    await _storage.write(key: 'refreshToken', value: refresh);
  }

  Future<String?> getAccessToken() => _storage.read(key: 'accessToken');
  Future<String?> getRefreshToken() => _storage.read(key: 'refreshToken');

  Future<void> clearTokens() async {
    await _storage.delete(key: 'accessToken');
    await _storage.delete(key: 'refreshToken');
  }
}

final storageServiceProvider = Provider((ref) {
  final storage = ref.watch(secureStorageProvider);
  return StorageService(storage);
});
