import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.purplePrimary,
        primary: AppColors.primary,
        surface: AppColors.background,
      ),
      scaffoldBackgroundColor: AppColors.background,
      textTheme: GoogleFonts.ubuntuTextTheme().copyWith(
        displayLarge: GoogleFonts.ubuntu(
          fontSize: 32,
          fontWeight: FontWeight.w800,
          color: AppColors.textMain,
          letterSpacing: -1,
        ),
        titleLarge: GoogleFonts.ubuntu(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          color: AppColors.textMain,
          letterSpacing: -0.5,
        ),
        bodyLarge: GoogleFonts.ubuntu(
          fontSize: 16,
          color: AppColors.textMain,
        ),
        bodyMedium: GoogleFonts.ubuntu(
          fontSize: 14,
          color: AppColors.textMuted,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
          minimumSize: const Size(double.infinity, 56),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          textStyle: GoogleFonts.ubuntu(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
          elevation: 4,
          shadowColor: AppColors.primary.withOpacity(0.3),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: BorderSide(color: AppColors.border, width: 1.5),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: BorderSide(color: AppColors.border, width: 1.5),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: const BorderSide(color: AppColors.rosePrimary, width: 1.5),
        ),
        hintStyle: GoogleFonts.ubuntu(
          color: AppColors.textSubtle,
          fontSize: 16,
        ),
      ),
    );
  }
}
