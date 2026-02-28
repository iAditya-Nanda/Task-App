import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../repositories/auth_repository.dart';

enum AuthStatus { initial, authenticated, unauthenticated, loading, error }

class AuthState {
  final AuthStatus status;
  final String? error;

  AuthState({this.status = AuthStatus.initial, this.error});

  AuthState copyWith({AuthStatus? status, String? error}) {
    return AuthState(
      status: status ?? this.status,
      error: error ?? this.error,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  final AuthRepository _repository;

  AuthNotifier(this._repository) : super(AuthState()) {
    checkAuth();
  }

  Future<void> checkAuth() async {
    final isLoggedIn = await _repository.isLoggedIn();
    state = state.copyWith(
      status: isLoggedIn ? AuthStatus.authenticated : AuthStatus.unauthenticated,
    );
  }

  Future<void> login(String email, String password) async {
    state = state.copyWith(status: AuthStatus.loading);
    try {
      await _repository.login(email, password);
      state = state.copyWith(status: AuthStatus.authenticated);
    } catch (e) {
      state = state.copyWith(status: AuthStatus.error, error: e.toString());
    }
  }

  Future<void> register(String email, String password) async {
    state = state.copyWith(status: AuthStatus.loading);
    try {
      await _repository.register(email, password);
      // After registration, user needs to login or we auto-login
      // For now, let's just set to unauthenticated so they can login
      state = state.copyWith(status: AuthStatus.unauthenticated);
    } catch (e) {
      state = state.copyWith(status: AuthStatus.error, error: e.toString());
    }
  }

  Future<void> logout() async {
    await _repository.logout();
    state = state.copyWith(status: AuthStatus.unauthenticated);
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final repository = ref.watch(authRepositoryProvider);
  return AuthNotifier(repository);
});
