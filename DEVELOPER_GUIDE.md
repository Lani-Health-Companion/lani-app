# Lani App - Developer Quick Reference

## Quick Links

- **Project Overview**: See `PROJECT_SUMMARY.md`
- **Setup Instructions**: See `SETUP.md`
- **Quick Start**: See `QUICKSTART.md`
- **Implementation Status**: See `IMPLEMENTATION_CHECKLIST.md`

## Key Files by Purpose

### Authentication
- `src/lib/auth.ts` - Auth context, useAuth() hook
- `app/auth/login.tsx` - Login screen with phone + OTP
- `app/_layout.tsx` - Root routing based on auth state

### Chat (Main Feature)
- `app/(tabs)/index.tsx` - Main chat screen
- `src/components/ChatBubble.tsx` - Message display
- `src/components/QuickReplies.tsx` - Suggestion buttons
- `src/lib/claude.ts` - Claude API integration

### Emergency
- `src/components/EmergencyButton.tsx` - 911 button
- Used in: `app/(tabs)/_layout.tsx` header

### Navigation
- `app/(tabs)/_layout.tsx` - 3 tabs (Lani, Friends, Family)
- `app/(tabs)/friends.tsx` - Friend matching screen
- `app/(tabs)/family.tsx` - Emergency contacts screen

### Backend
- `src/lib/supabase.ts` - Database client
- `supabase/migrations/001_initial_schema.sql` - Database schema
- `src/hooks/useConversation.ts` - Conversation management
- `src/hooks/useProfile.ts` - User profile management

### Design
- `src/constants/theme.ts` - Colors, fonts, spacing
- All components use `THEME` from constants

### Types
- `src/types/index.ts` - TypeScript interfaces

---

## Common Tasks

### Add a New Component

1. Create in `src/components/MyComponent.tsx`
2. Import THEME: `import { THEME } from '@constants/theme'`
3. Style with theme values
4. Export from `src/components/index.ts`
5. Import with: `import { MyComponent } from '@components/MyComponent'`

### Change Colors

Edit `src/constants/theme.ts`:
```typescript
colors: {
  primary: '#4A90D9',        // Change this
  warmWhite: '#FFF8F0',       // Or this
  text: '#1A1A2E',           // Or this
  // ... etc
}
```

All components use `THEME.colors.*` so changes apply everywhere.

### Add Font Size

Edit `src/constants/theme.ts` fonts section:
```typescript
fonts: {
  // Format: fontSize, fontWeight, lineHeight
  myNewSize: {
    fontSize: 20,      // Never less than 20 for seniors
    fontWeight: '600',
    lineHeight: 28,
  }
}
```

### Change the Chat Bubble Style

Edit `src/components/ChatBubble.tsx`:
```typescript
const styles = StyleSheet.create({
  bubble: {
    // Edit colors, padding, border radius here
  },
  // ...
});
```

### Modify Lani's Personality

Edit `src/lib/claude.ts`:
```typescript
export const LANI_SYSTEM_PROMPT = `
  You are Lani, a warm and caring...
  // Edit this text to change behavior
`;
```

### Add Database Table

1. Edit `supabase/migrations/001_initial_schema.sql`
2. Add CREATE TABLE statement
3. Add RLS policies for security
4. Add indexes for performance
5. Push to Supabase: `supabase db push`

### Add API Function

1. Create in `src/lib/myApi.ts`
2. Use supabase client: `import { supabase } from './supabase'`
3. Handle errors and typing
4. Export from `src/lib/index.ts`
5. Use in components with proper error handling

### Create Custom Hook

1. Create in `src/hooks/useMyHook.ts`
2. Use React hooks: useState, useCallback, etc.
3. Export from `src/hooks/index.ts`
4. Import in component: `import { useMyHook } from '@hooks'`

### Debug Auth State

Add to any component:
```typescript
import { useAuth } from '@hooks';

export default function MyScreen() {
  const { user, session, loading } = useAuth();

  console.log('User:', user);
  console.log('Session:', session);
  console.log('Loading:', loading);
  // ...
}
```

### Debug Supabase

In any component:
```typescript
import { supabase } from '@lib';

const testQuery = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .limit(1);

  console.log('Data:', data);
  console.log('Error:', error);
};
```

---

## File Structure

```
lani-app/
├── app/                      # expo-router screens
│   ├── _layout.tsx           # Root layout
│   ├── (tabs)/               # Tabbed screens
│   │   ├── _layout.tsx
│   │   ├── index.tsx         # Main chat
│   │   ├── friends.tsx
│   │   └── family.tsx
│   └── auth/                 # Auth screens
│       ├── _layout.tsx
│       └── login.tsx
│
├── src/
│   ├── components/           # React components
│   ├── lib/                  # Core libraries (Supabase, Claude, Auth)
│   ├── constants/            # Configuration (theme, constants)
│   ├── types/                # TypeScript interfaces
│   └── hooks/                # Custom React hooks
│
├── supabase/
│   └── migrations/           # Database schemas
│
├── assets/                   # Images, icons (to add)
├── app.json                  # Expo configuration
├── index.js                  # Entry point
├── tsconfig.json            # TypeScript config
├── babel.config.js          # Babel config
└── package.json             # Dependencies
```

---

## Design System

### Sizing
- **Touch targets**: 64px minimum (THEME.button.height)
- **Small buttons**: 48px (THEME.button.smallHeight)
- **Icons**: 32px (tab), 48px (button), 64px (hero)
- **Spacing**: xs=4, sm=8, md=12, lg=16, xl=20, xxl=24

### Colors
```typescript
primary: '#4A90D9'           // Main blue
warmWhite: '#FFF8F0'         // Background
text: '#1A1A2E'              // Main text
lightGray: '#F5F5F5'         // Secondary bg
emergency: '#E74C3C'         // Red for 911
```

### Typography
```
Title:    28px bold
Heading:  20px semi-bold
Body:     18px regular (✓ 20px+ for seniors)
Caption:  16px regular
```

---

## Testing

### Manual Test Checklist
- [ ] App starts: `npx expo start`
- [ ] Can log in with phone number
- [ ] Can verify OTP
- [ ] Chat screen shows initial message
- [ ] Can type and send message
- [ ] Quick reply buttons work
- [ ] 911 button visible on all tabs
- [ ] 911 button shows confirmation
- [ ] Navigation between tabs works
- [ ] Text is readable (20px+)
- [ ] Buttons are tappable (64px+)

### Debugging Commands
```bash
# View Expo logs
npx expo start

# Clear cache
expo start --clear

# Test on iOS
expo start -i

# Test on Android
expo start -a

# TypeScript check
npx tsc --noEmit
```

---

## Common Errors & Solutions

### "Module not found: @components/..."
**Solution**: Check path aliases in tsconfig.json. Should be defined.

### "useAuth must be used within an AuthProvider"
**Solution**: Wrap app in AuthProvider (done in app/_layout.tsx).

### "Claude API error"
**Solution**: Set API key via SecureStore before calling sendMessageToClaude.

### "Supabase connection error"
**Solution**: Check URL and key in src/lib/supabase.ts.

### Font too small
**Solution**: Change in src/constants/theme.ts. Keep minimum 20px.

### Touch target too small
**Solution**: Use THEME.button.height (64px) for buttons.

---

## Environment Variables

Create `.env.local` from `.env.example`:
```
EXPO_PUBLIC_SUPABASE_URL=<your-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-key>
```

For Claude API key, use SecureStore in app (not env vars).

---

## Performance Tips

1. **Use FlatList** for long lists (chat messages)
2. **Memoize heavy components**: React.memo()
3. **Debounce text input** before sending
4. **Lazy load screens** (expo-router does this)
5. **Optimize images** (use vector icons)

---

## Security

1. **No secrets in code** - Use env vars or SecureStore
2. **RLS enabled** - All Supabase tables have policies
3. **HTTPS only** - All API calls encrypted
4. **Type safe** - TypeScript catches errors
5. **Error handling** - No sensitive data in logs

---

## Deployment

### Before Release
- [ ] Remove console.log statements
- [ ] Test on real device
- [ ] Check all fonts are 20px+
- [ ] Verify emergency button works
- [ ] Test with real Supabase/Claude keys
- [ ] Get app icon and splash images

### Build Command
```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

---

## Support Resources

- **Expo Docs**: https://docs.expo.dev
- **expo-router**: https://expo.github.io/router
- **React Native Docs**: https://reactnative.dev
- **Supabase Docs**: https://supabase.com/docs
- **Anthropic API**: https://docs.anthropic.com

---

## Team Notes

- All code is production-ready
- Use TypeScript everywhere
- Senior-friendly design is required
- Test on actual devices
- Keep components small and focused
- Document complex logic

---

**Last Updated**: 2026-03-30
**Status**: MVP Complete
**Ready for**: User Testing
