import { Grid } from '@mantine/core';
import { CardInfo } from '../Components/card-info';
import { DataCard } from '../Components/data-card';
import { generateCardWithCovidData, SOUTH_AMERICA } from '../consts';
import { CountryAutocomplete } from '../Components/country-autocomplete';
import { useCovidStore } from '../stores';
import { useEffect } from 'react';
import { formatLongDateWithTime } from '../utils';
import { Syringe } from 'lucide-react';
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

  useEffect(() => {
    fetchCovidData();
    fetchTestChartData();
  }, [country, fetchCovidData, fetchTestChartData]);

  const cards = generateCardWithCovidData(covidData);

  return (
    <main className="w-full min-h-screen max-w-3xl p-4 m-auto ">
      <Grid>
        <Grid.Col span={12}>
          <CountryAutocomplete />
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
