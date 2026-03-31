# Lani App - Quick Start Guide

## 5-Minute Setup

### 1. Install & Start
```bash
cd lani-app
npm install
npx expo start
```

### 2. Run App
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web (limited testing)

### 3. Test Login
- Enter test phone: `5551234567` (or any 10-digit number)
- Use OTP code from Supabase logs
- You'll see the chat interface

### 4. Test Chat
- Type a message and hit send
- You should see "Claude API key not configured" error
- This is expected - need to set up API key (see below)

## Setting Up Claude API

1. Get API key from https://console.anthropic.com/account/keys
2. In the app, you need to set this via expo-secure-store
3. For now, the app will show an error and you can manually test

### Manual Testing (via console)
```javascript
// In app, before sending messages
import * as SecureStore from 'expo-secure-store';

SecureStore.setItemAsync('claude_api_key', 'your-api-key-here');
```

Then restart the app and try sending a message.

## Project Files Overview

### Core App Files
- `index.js` - Entry point
- `app.json` - App configuration
- `app/_layout.tsx` - Root navigation
- `app/(tabs)/_layout.tsx` - Tab bar setup
- `app/(tabs)/index.tsx` - **Main chat screen** (this is where the magic happens)
- `app/auth/login.tsx` - Login screen

### Components (in src/components/)
- `ChatBubble.tsx` - Message display
- `QuickReplies.tsx` - Suggestion buttons
- `EmergencyButton.tsx` - 911 emergency button
- `TabBarIcon.tsx` - Tab bar icons

### Libraries (in src/lib/)
- `supabase.ts` - Database client
- `claude.ts` - Claude API integration
- `auth.ts` - Authentication context

### Configuration
- `src/constants/theme.ts` - Colors, fonts, spacing
- `tsconfig.json` - TypeScript settings
- `babel.config.js` - Build configuration

## Key Features Implemented

✅ **Auth**
- Phone number login
- OTP verification
- Session management

✅ **Chat Interface**
- Message bubbles
- Quick reply buttons
- Input field with send button
- Mic button (placeholder)
- Message history

✅ **Design**
- Senior-friendly (20px+ fonts)
- Large touch targets (64px+)
- WCAG AAA contrast
- Warm color palette

✅ **Emergency**
- Red 911 button on every screen
- Confirmation dialog

✅ **Navigation**
- Three tabs: Chat, Friends, Family
- Clean routing with expo-router

## Features Coming Soon

⏳ **Claude Integration** (needs API key setup)
- AI responses
- Conversation memory
- Crisis detection

⏳ **Friend Matching**
- Find peers
- Interest-based matching
- Messaging

⏳ **Emergency Contacts**
- Add family contacts
- Quick call buttons
- Emergency alerts

⏳ **Voice Input**
- Mic button to speak
- Speech-to-text

## Troubleshooting

### Blank Screen
- Check console: `npx expo start` shows logs
- Clear cache: `expo start --clear`
- Try simulator: `expo start -a` or `expo start -i`

### TypeScript Errors
- All files are typed correctly
- If you see errors, try: `npm install`
- Check tsconfig.json is in root

### Supabase Connection Issues
- Verify URL and key in src/lib/supabase.ts
- Check network connectivity
- Login should work even offline (cached)

### Claude API Errors
- Set API key using SecureStore
- Check API key is valid
- Verify API key has access to Haiku model

## Development Tips

### Edit Chat Behavior
- Main chat logic: `app/(tabs)/index.tsx` (lines 1-100)
- Message rendering: `src/components/ChatBubble.tsx`
- Quick replies: `src/components/QuickReplies.tsx`
- Theme: `src/constants/theme.ts`

### Add New Feature
1. Create component in `src/components/`
2. Import in relevant screen (app/(tabs)/*.tsx)
3. Use theme colors/fonts
4. Test on simulator

### Change Colors
- Edit `src/constants/theme.ts`
- Primary color: `#4A90D9` (blue)
- Error/Emergency: `#E74C3C` (red)

### Adjust Font Sizes
- Edit `src/constants/theme.ts` fonts section
- Minimum: 20px for readability
- All seniors-friendly

## File Structure Summary

```
app/
├── _layout.tsx           ← Root with auth routing
├── (tabs)/
│   ├── _layout.tsx       ← Tab bar configuration
│   ├── index.tsx         ← MAIN CHAT SCREEN
│   ├── friends.tsx       ← Friend matching (soon)
│   └── family.tsx        ← Emergency contacts (soon)
└── auth/
    ├── _layout.tsx       ← Auth routes
    └── login.tsx         ← Phone/OTP login

src/
├── components/           ← UI components
│   ├── ChatBubble.tsx
│   ├── QuickReplies.tsx
│   ├── EmergencyButton.tsx
│   └── TabBarIcon.tsx
├── lib/                  ← Core logic
│   ├── supabase.ts       ← Database
│   ├── claude.ts         ← Claude API
│   └── auth.ts           ← Auth context
├── constants/            ← Configuration
│   └── theme.ts          ← Colors, fonts
├── types/                ← TypeScript types
├── hooks/                ← React hooks
│   ├── useConversation.ts
│   └── useProfile.ts
```

## Next Steps

1. **Set Claude API Key** (required for chat to work)
   - Get key: https://console.anthropic.com/account/keys
   - Store in app via SecureStore

2. **Test Full Flow**
   - Login with phone
   - Send message
   - Get Claude response

3. **Customize**
   - Change app colors in theme.ts
   - Edit Lani's personality in src/lib/claude.ts
   - Add emergency contact features

4. **Deploy**
   - Test on real devices
   - Use `expo prebuild` for native builds
   - Deploy with EAS Build

## Support Files

- `SETUP.md` - Detailed setup and deployment
- `QUICKSTART.md` - This file
- `app.json` - App configuration
- `tsconfig.json` - TypeScript configuration

## Ready to Build?

```bash
# Development
npx expo start

# iOS
expo start -i

# Android
expo start -a

# Web (limited features)
expo start -w

# Prebuild for native (requires Apple Developer account)
expo prebuild --platform ios
```

Good luck building Lani!
