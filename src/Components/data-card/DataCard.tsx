import { Card, Flex, Text, Title, useMantineColorScheme } from '@mantine/core';
import { Virus, type LucideIcon } from 'lucide-react';
import { cn, formatNumber } from '../../utils';
import { CARD_COLORS, type CardColor } from '../../consts';

interface DataCardProps {
  title: string;
  total: number;
  increment: number;
  color?: CardColor;
  icon?: LucideIcon;
}

export const DataCard = ({ title, total, increment, color, icon: Icon = Virus }: DataCardProps) => {
  const { colorScheme } = useMantineColorScheme();

  const textColor = color ? CARD_COLORS[color].text : '';
  const bgCardColor = color ? CARD_COLORS[color].bg : '';

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      className={cn(
        'min-h-44',
        'relative transition-all! p-4! [&_svg]:absolute',
        '[&_svg]:right-1/2 [&_svg]:top-1/2',
        '[&_svg]:translate-x-1/2 [&_svg]:-translate-y-1/2',
        {
          '[&_svg]:opacity-10': colorScheme === 'dark',
          '[&_svg]:opacity-20': colorScheme !== 'dark',
          [bgCardColor]: colorScheme !== 'dark',
        }
      )}
    >
      <Icon size={160} strokeWidth={2} />

      <Flex
        direction="column"
        justify="space-between"
        flex={1}
        className={cn('w-full h-full z-50', {
          [textColor]: colorScheme === 'dark',
        })}
      >
        <Title order={3}>{title}</Title>

        <Flex direction="column" justify="end" className="h-full">
          <Text
            size="xl"
            className="font-extrabold! text-2xl! md:text-3xl! lg:text-4xl! text-end transition-all! drop-shadow-2xl"
          >
            {formatNumber(total)}
          </Text>

          <Text size="sm" className="text-end">
            +{formatNumber(increment)} hoy
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
