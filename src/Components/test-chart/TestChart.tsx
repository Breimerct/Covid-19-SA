import { Card, Divider, Skeleton, Title, useMantineColorScheme } from '@mantine/core';
import { cn, formatNumber } from '../../utils';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipContentProps,
  Bar,
} from 'recharts';
import type { TestChartItem } from '../../types';
import { FlaskConical } from 'lucide-react';

export interface TestChatProps {
  data: TestChartItem[];
  isloading?: boolean;
}

const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  const firstPayload = payload?.[0];
  const isVisible = active && firstPayload != null;
  return (
    <div className="p-4 bg-amber-400/80 rounded-xl text-slate-950 min-w-44">
      {isVisible && (
        <>
          <h4 className="font-bold">{firstPayload.payload.country}</h4>
          <Divider mt={2} />
          <p className="label font-semibold flex justify-between w-full">
            {`${firstPayload.payload.iso3}: `}

            <span className="font-mono font-extrabold!">
              {formatNumber(Number(firstPayload.value))}{' '}
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export const TestChart = ({ data, isloading }: TestChatProps) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      className={cn('min-h-44', 'relative transition-all! p-4! ')}
    >
      <Title
        order={2}
        className={cn('mb-2!', {
          'text-amber-400': colorScheme === 'dark',
          'opacity-80': colorScheme !== 'dark',
        })}
      >
        Pruebas realizadas
      </Title>

      <FlaskConical
        size={160}
        strokeWidth={2}
        className={cn('absolute', 'right-1/2 top-1/2', 'translate-x-1/2 -translate-y-1/2', {
          'opacity-10': colorScheme === 'dark',
          'opacity-20': colorScheme !== 'dark',
        })}
      />

      <Skeleton visible={!!isloading}>
        <LineChart
          style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
          responsive
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="iso3" niceTicks="snap125" scale="band" />
          <YAxis
            dataKey="value"
            interval={0}
            width="auto"
            niceTicks="snap125"
            domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.08)]}
            tickCount={8}
            allowDecimals={false}
            tickFormatter={formatNumber}
          />
          <Tooltip content={CustomTooltip} />
          <Line type="monotone" strokeWidth={2} stroke="var(--color-amber-400)" dataKey="value" />
          <Bar
            dataKey="value"
            stroke="var(--color-amber-400)"
            fill="var(--color-amber-400)"
            radius={[4, 4, 0, 0]}
          />
        </LineChart>
      </Skeleton>
    </Card>
  );
};
