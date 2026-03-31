# Lani App - Setup Guide

## Overview
Lani is a React Native mobile app (using Expo) designed as an AI companion to combat loneliness in seniors. The app features:
- Chat interface with Claude AI (Haiku model)
- Phone number authentication via Supabase
- Emergency 911 button on every screen
- Senior-friendly UI (large text, high contrast, touch targets)
- Coming soon: Friend matching and family emergency contacts

## Prerequisites
- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- Supabase account (configured at https://supabase.com)
- Anthropic API key for Claude Haiku

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

3. **Initialize Supabase locally (optional)**
   ```bash
   supabase start
   supabase db push
   ```

## Configuration

### Supabase Setup
The app uses:
- **Project URL**: https://limwdusgqsxylsaelppc.supabase.co
- **Anon Key**: sb_publishable_k3xP78RG7SzLIH2sffj2Qg_6lDrh69g
- **Auth**: Phone number OTP authentication
- **Database**: PostgreSQL with RLS policies

### Claude API Setup
1. Get your API key from Anthropic (https://console.anthropic.com)
2. In the app, go to Settings and paste your API key
3. The app securely stores it using expo-secure-store

## Running the App

### Development
```bash
npx expo start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser

### Testing Auth Flow
- Use test phone numbers in development (Supabase allows this)
- OTP codes are sent to the phone number
- After verification, you'll see the chat interface

### Testing with Real Device
```bash
# Scan QR code with Expo Go app (iOS/Android)
npx expo start --tunnel
```

## Project Structure

```
lani-app/
├── app/                    # expo-router file-based routing
│   ├── _layout.tsx        # Root layout with auth
│   ├── (tabs)/            # Tab navigation group
│   │   ├── _layout.tsx    # Tab bar layout
│   │   ├── index.tsx      # Chat screen (main)
│   │   ├── friends.tsx    # Friend matching (coming soon)
│   │   └── family.tsx     # Emergency contacts (coming soon)
│   └── auth/              # Authentication screens
│       ├── _layout.tsx
│       └── login.tsx      # Phone/OTP login
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ChatBubble.tsx
│   │   ├── QuickReplies.tsx
│   │   ├── EmergencyButton.tsx
│   │   └── TabBarIcon.tsx
│   ├── lib/              # Core libraries
│   │   ├── supabase.ts   # Supabase client
│   │   ├── claude.ts     # Claude AI integration
│   │   └── auth.ts       # Auth context provider
│   ├── constants/        # Theme, config
│   │   └── theme.ts      # Color, font, spacing
│   ├── types/            # TypeScript types
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Helper functions
├── supabase/
│   └── migrations/       # Database schema
├── app.json             # Expo config
├── babel.config.js      # Babel configuration
└── tsconfig.json        # TypeScript config
```

## Design System (Senior-Friendly)

### Colors
- **Primary**: #4A90D9 (blue)
- **Warm White**: #FFF8F0
- **Text**: #1A1A2E
- **Error/Emergency**: #E74C3C (red)

### Typography
- **Minimum font size**: 20px (WCAG AAA for seniors)
- **Heading**: 20-28px
- **Body**: 18px
- **Caption**: 16px

### Touch Targets
- **Minimum**: 64px x 64px (better than standard 48px)
- **Buttons**: 64px height minimum

### Contrast
- WCAG AAA compliant (dark text on light backgrounds)
- All text ≥ 7:1 contrast ratio

## Key Features

### Chat Interface
- Two-way conversation with Lani AI
- Message bubbles (Lani in blue, user in darker blue)
- Quick-reply suggestion buttons
- Voice input button (mic icon)
- Text input with send button
- Timestamp on each message

### Emergency Button
- Red 911 button on every screen
- Confirmation dialog before calling
- Uses system phone app

### Authentication
- Phone number login
- SMS OTP verification
- Secure session management
- Auto-refresh tokens

### Accessibility
- Large touch targets
- High contrast colors
- Clear, simple language
- Minimal scrolling
- Clear visual hierarchy

## Development Notes

### State Management
- Auth state via React Context (useAuth hook)
- Local message state in chat screen
- Supabase for persistent storage

### API Integration
- Claude Haiku via Anthropic API
- Supabase for auth and database
- expo-secure-store for API key storage

### Known Limitations
- Friend matching (coming soon)
- Voice input (coming soon)
- Offline mode (coming soon)
- Message history persistence (coming soon)

## Testing Checklist

- [ ] Auth flow (phone + OTP)
- [ ] Chat sending/receiving messages
- [ ] Quick-reply buttons
- [ ] 911 button appears on all screens
- [ ] 911 confirmation dialog
- [ ] Message timestamps
- [ ] Font sizes (20px+)
- [ ] Touch target sizes (64px+)
- [ ] Color contrast (WCAG AAA)
- [ ] Responsive layout (portrait only)

## Troubleshooting

### Auth not working
- Check Supabase credentials in .env.local
- Verify phone number format (+1 for US)
- Check OTP code is correct

### Claude API errors
- Verify API key is set correctly
- Check API key hasn't been revoked
- Verify API key has access to Claude Haiku

### Build errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo start --clear`
- Check Node version: `node --version` (should be 18+)

## Deployment

### iOS
1. Create Apple Developer account
2. Configure signing in `eas.json`
3. Run `eas build --platform ios`

### Android
1. Create Google Play account
2. Generate keystore
3. Run `eas build --platform android`

## Contributing

- Follow the project structure
- Use TypeScript for all code
- Maintain senior-friendly design constraints
- Test on actual devices when possible

## Support

For issues or questions:
1. Check SETUP.md (this file)
2. Check Supabase documentation
3. Check Anthropic API documentation
4. Review expo-router docs for routing

## License

MIT
