import { ActionIcon, Grid, Tooltip, useMantineColorScheme } from '@mantine/core';
import { CardInfo } from '../Components/card-info';
import { DataCard } from '../Components/data-card';
import { generateCardWithCovidData, SOUTH_AMERICA } from '../consts';
import { CountryAutocomplete } from '../Components/country-autocomplete';
import { useCovidStore, useThemeStore } from '../stores';
import { useEffect } from 'react';
import { formatLongDateWithTime } from '../utils';
import { Moon, Sun, Syringe } from 'lucide-react';
import { TestChart } from '../Components/test-chart';

function App() {
  const {
    country,
    covidData,
    testChartData,
    isLoading,
    isLoadingTestChart,
    fetchCovidData,
    fetchTestChartData,
  } = useCovidStore();
  const { colorScheme, toggleTheme } = useThemeStore();
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    fetchCovidData();

    if (country.value === SOUTH_AMERICA.value) {
      fetchTestChartData();
    }
  }, [country, fetchCovidData, fetchTestChartData]);

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme]);

  const cards = generateCardWithCovidData(covidData);

  return (
    <main className="w-full min-h-screen max-w-3xl p-4 m-auto ">
      <Grid>
        <Grid.Col span={12}>
          <div className="flex max-w-xl items-center gap-3 mx-auto">
            <div className="min-w-0 flex-1">
              <CountryAutocomplete />
            </div>

            <Tooltip label={colorScheme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}>
              <ActionIcon
                aria-label={colorScheme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
                variant="default"
                size="lg"
                onClick={toggleTheme}
              >
                {colorScheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </ActionIcon>
            </Tooltip>
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
          <CardInfo
            lastUpdate={formatLongDateWithTime(covidData?.updated)}
            totalCases={covidData?.cases || 0}
            increment={covidData?.todayCases || 0}
            flag={country.flag}
            isLoading={isLoading}
          />
        </Grid.Col>

        {cards.map((card, index) => (
          <Grid.Col span={6} key={index}>
            <DataCard
              title={card.title}
              total={card.total}
              increment={card.increment}
              color={card.textColor}
              icon={card.icon}
              isLoading={isLoading}
            />
          </Grid.Col>
        ))}

        {country.value !== SOUTH_AMERICA.value && (
          <Grid.Col span={12}>
            <DataCard
              title="Vacunas"
              total={covidData?.vaccine || 0}
              increment={0}
              color="purple"
              icon={Syringe}
              errorMessage={covidData?.vaccineError}
              isLoading={isLoading}
            />
          </Grid.Col>
        )}

        {country.value === SOUTH_AMERICA.value && (
          <Grid.Col span={12}>
            <TestChart data={testChartData} isloading={isLoading || isLoadingTestChart} />
          </Grid.Col>
        )}
      </Grid>
    </main>
  );
}

export default App;
