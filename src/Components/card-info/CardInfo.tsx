import {
  Anchor,
  Avatar,
  Card,
  Divider,
  Flex,
  Skeleton,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Check, ExternalLink, Virus } from 'lucide-react';
import { cn, formatNumber } from '../../utils';

interface CardInfoProps {
  lastUpdate: string;
  totalCases: number;
  increment: number;
  flag: string;
  isLoading?: boolean;
}

export const CardInfo = ({ lastUpdate, totalCases, increment, flag, isLoading }: CardInfoProps) => {
  const { colorScheme } = useMantineColorScheme();

  const textColor = { 'text-cyan-600': colorScheme === 'dark' };
  const bgCard = { 'bg-cyan-600! text-white!': colorScheme !== 'dark' };

  return (
    <Card shadow="sm" radius="md" withBorder className={cn('relative transition-all!', bgCard)}>
      <Virus
        className={cn('absolute -right-6 -top-6', {
          'opacity-10': colorScheme === 'dark',
          'opacity-40': colorScheme !== 'dark',
        })}
        size={160}
      />

      <Card.Section className={cn('mb-0.5! px-4 z-50')}>
        <Flex direction="row" align={'center'}>
          <Avatar variant="transparent" size="xl" src={flag} />

          <Flex direction="column" className="ml-4">
            <Text className="font-bold! ml-4" component="p">
              Última actualizaciòn de los datos
            </Text>

            {!isLoading ? (
              <Text component="time" className="text-xs font-mono! ml-4 mt-1">
                {lastUpdate}
              </Text>
            ) : (
              <Skeleton height="15px" my={2} />
            )}

            <Divider className="my-1" />

            <Flex gap={4}>
              <strong>Fuente: </strong>
              <Anchor
                c="white"
                href="https://disease.sh/"
                target="_blank"
                className="flex! flex-row! items-center gap-1"
              >
                https://disease.sh/ <ExternalLink size={14} />
              </Anchor>
            </Flex>
          </Flex>
        </Flex>

        <Divider my="sm" className="my-2" />

        <Flex direction={'column'}>
          <Text
            className={cn(
              'font-bold! text-xl! sm:text-2xl! md:text-3xl! transition-all! flex items-center',
              textColor
            )}
            component="p"
          >
            <span>Total de casos confirmados</span>

            <Check className="inline-block ml-4" strokeWidth={4} size={30} />
          </Text>

          {!isLoading ? (
            <Text
              className={cn(
                'font-extrabold! text-xl! md:text-2xl! lg:text-4xl! text-end transition-all! drop-shadow-2xl',
                textColor
              )}
              component="h2"
            >
              {formatNumber(totalCases)}
            </Text>
          ) : (
            <Skeleton height="20px" width="50%" my={2} className="self-end" />
          )}

          {!isLoading ? (
            <Text className={cn('text-xs font-mono! mt-1 text-end', textColor)}>
              incrementos +{increment}
            </Text>
          ) : (
            <Skeleton height="14px" width="24%" my={2} className="self-end" />
          )}
        </Flex>
      </Card.Section>
    </Card>
  );
};
