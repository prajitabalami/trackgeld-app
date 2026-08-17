# Trackgeld

React Native prototype for Trackgeld, built with Expo and TypeScript.

## Why Expo

Expo is the best fit for this stage because it gives you React Native, Android/iOS preview, and simple laptop setup without needing to manage native Android and iOS project files yet. You can still move to development builds or store builds later.

## Laptop Setup

Install these:

1. Node.js LTS
2. Visual Studio Code
3. Expo Go on your phone from the iOS App Store or Google Play Store
4. Android Studio only if you want an Android emulator on the laptop
5. Git, optional but recommended

You already have Node `v20.17.0` and npm `10.8.2` available on this machine.

## Run The App

Open PowerShell in this folder:

```powershell
cd "C:\Users\praji\OneDrive\Documents\Trackgels"
npm install
npx expo start
```

Then scan the QR code with Expo Go. For the emulator, open Android Studio first and start a device, then press `a` in the Expo terminal.

If npm gives a cache permission error, use a project-local cache for that terminal:

```powershell
$env:npm_config_cache="$PWD\.npm-cache"
npm install
npx expo start
```

## Project Structure

```text
src/
  components/       reusable UI pieces
  screens/          app screens
  theme/theme.ts    colors, spacing, radius, typography, shadows
```

To change the app color theme, edit `src/theme/theme.ts`. The screens and components read from that single theme file.

## Current Screens

- Login screen
- Dummy home screen
- Demo login path with local state only

