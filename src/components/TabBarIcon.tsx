import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '@constants/theme';

export function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
  size?: number;
}) {
  return (
    <MaterialCommunityIcons
      size={props.size || THEME.icon.large}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}
