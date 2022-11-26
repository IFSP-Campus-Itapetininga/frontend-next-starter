import { Container, Button, Alert } from 'react-bootstrap';
import { Layout } from 'layout';
import { useForm, FormProvider } from 'react-hook-form';
import { StatisticCard, Header } from '../components';
import { convertMonetary } from 'utils';
import { DatePicker, Loading } from 'components';
import styled from './statistics_page.module.scss';
import { useState } from 'react';

export default function StatisticView({
  statistics,
  isLoading,
  filter,
  setFilter,
}) {
  const methods = useForm();
  const [isValid, setIsValid] = useState(false);

  const onSubmit = async (value) => {
    if (!value.initial_date || !value.final_date) {
      setIsValid(true);
      return;
    }
    setIsValid(false);
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
          {isValid && (
            <Alert variant="warning">
              Por favor, selecione uma data para continuar!
            </Alert>
          )}
          <FormProvider {...methods}>
            <form
              className={styled.formWrapper}
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
            statistic={
              statistics?.order?.total_sales
                ? statistics?.order?.total_sales
                : 0
            }
            color="primary"
          />
          <StatisticCard
            icon="/icons/cash-stack.svg"
            title="Valor arrecadado"
            description="Valor arrecadado"
            statistic={`${
              statistics?.order?.total_colected
                ? convertMonetary(statistics?.order?.total_colected)
                : convertMonetary(0)
            }`}
            color="green"
          />
          <StatisticCard
            icon="/icons/person.svg"
            title="Novos clientes"
            description="Quantidade de novos clientes"
            statistic={
              statistics?.clients?.total_clients
                ? statistics?.clients?.total_clients
                : 0
            }
            color="yellow"
          />
        </div>
      </Container>

      <Loading show={isLoading} />
    </Layout>
  );
}
