import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../providers/auth_provider.dart';
import '../../core/constants/app_colors.dart';
import '../auth/login_screen.dart';
import '../dashboard/dashboard_screen.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({super.key});

  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    await Future.delayed(const Duration(seconds: 2));
    final authState = ref.read(authProvider);
    
    if (mounted) {
      if (authState.status == AuthStatus.authenticated) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => const DashboardScreen()),
        );
      } else {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => const LoginScreen()),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Stack(
        children: [
          // Decorative Blobs
          Positioned(
            top: -100,
            right: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                color: AppColors.purpleLight.withAlpha(128), // Replacing withAlpha for withOpacity
                shape: BoxShape.circle,
              ),
            ).animate().fadeIn(duration: 1000.ms).scale(begin: const Offset(0.5, 0.5)),
          ),
          Positioned(
            bottom: -50,
            left: -50,
            child: Container(
              width: 200,
              height: 200,
              decoration: BoxDecoration(
                color: AppColors.blueLight.withAlpha(128),
                shape: BoxShape.circle,
              ),
            ).animate().fadeIn(duration: 1200.ms, delay: 200.ms).scale(begin: const Offset(0.5, 0.5)),
          ),
          
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    color: Colors.black,
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withAlpha(51),
                        blurRadius: 20,
                        offset: const Offset(0, 10),
                      ),
                    ],
                  ),
                  child: Center(
                    child: SvgPicture.asset(
                      'assets/logo.svg',
                      colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                      width: 50,
                      height: 50,
                    ),
                  ),
                )
                  .animate()
                  .fadeIn(duration: 800.ms)
                  .scale(begin: const Offset(0.8, 0.8), curve: Curves.elasticOut)
                  .shimmer(delay: 1500.ms, duration: 1000.ms),
                const SizedBox(height: 24),
                Text(
                  'TaskFlow',
                  style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 40),
                )
                  .animate()
                  .fadeIn(delay: 400.ms, duration: 600.ms)
                  .moveY(begin: 20, end: 0),
                const SizedBox(height: 8),
                Text(
                  'Manage tasks beautifully',
                  style: Theme.of(context).textTheme.bodyMedium,
                )
                  .animate()
                  .fadeIn(delay: 600.ms, duration: 600.ms),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
