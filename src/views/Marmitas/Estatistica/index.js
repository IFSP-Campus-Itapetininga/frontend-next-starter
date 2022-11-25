import { Container, Button } from 'react-bootstrap';
import { Layout } from 'layout';
import { useForm, FormProvider } from 'react-hook-form';
import { StatisticCard, Header } from '../components';
import { convertMonetary } from 'utils';
import { DatePicker } from 'components';
import styled from './statistics_page.module.scss';

export default function StatisticView({
  statistics,
  isLoading,
  filter,
  setFilter,
}) {
  const methods = useForm();

  const onSubmit = async (value) => {
    console.log('asd', value);
    setFilter({
      ...value,
    });
  };

  return (
    <Layout session="Marmitas">
      <Container className="py-4">
        <Header
          route="/marmitas"
          sectionTitle="Faturamento"
          showButton={false}
        />

        <div className="mt-4">
          <FormProvider {...methods}>
            <form
              className="d-flex rounded-1 flex-row align-items-end gap-3 justify-content-end"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <DatePicker
                name="initial_date"
                startDate={methods.watch('initial_date')}
                endDate={methods.watch('final_date')}
                maxDate={methods.watch('final_date')}
                defaultDate={filter.initial_date}
                placeholder="Data inicial"
                selectsStart
              />
              <DatePicker
                name="final_date"
                startDate={methods.watch('initial_date')}
                endDate={methods.watch('final_date')}
                minDate={methods.watch('start_date')}
                defaultDate={filter.final_date}
                placeholder="Data final"
                selectsEnd
              />

              <Button variant="primary" type="submit">
                Buscar
              </Button>
            </form>
          </FormProvider>
        </div>

        <div className={`mt-4 ${styled.wrapper}`}>
          <StatisticCard
            icon="/icons/cart-frame.svg"
            title="Marmitas"
            description="Marmitas vendidas no mês"
            statistic={statistics?.order?.total_sales}
            color="primary"
          />
          <StatisticCard
            icon="/icons/cash-stack.svg"
            title="Valor arrecadado"
            description="Valor arrecadado"
            statistic={`${convertMonetary(statistics?.order?.total_colected)}`}
            color="green"
          />
          <StatisticCard
            icon="/icons/person.svg"
            title="Novos clientes"
            description="Quantidade de novos clientes"
            statistic={statistics?.clients?.total_clients}
            color="yellow"
          />
        </div>
      </Container>
    </Layout>
  );
}
