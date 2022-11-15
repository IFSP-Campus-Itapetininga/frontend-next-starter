import Image from 'next/image';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { convertMonetary } from 'utils';
import styled from './step3.module.scss';

export function Step3({
  previousStep,
  setFormData,
  formData,
  disableButton,
  ...props
}) {
  const handleMoreItems = (item) => {
    algumNomeTeste('add', item);
  };

  const handleLessItems = (item) => {
    if (item.quantidade < 2) {
      const product = formData.filter((el) => el.id !== item.id);

      setFormData((state) => {
        return { ...state, produtos: product };
      });
      return;
    }

    algumNomeTeste('less', item);
  };

  const algumNomeTeste = (type, item) => {
    const items = formData || [];
    const newProduct = items.reduce((acc, el) => {
      if (el.id === item.id) {
        el.quantidade =
          type === 'add' ? (el.quantidade += 1) : (el.quantidade -= 1);
        el.preco = el.unit_price * el.quantidade;
        el.formate_price = convertMonetary(el.preco);
        items.splice(items.indexOf(el), 1);

        return el;
      }

      return acc;
    }, item);

    items.push(newProduct);
    setFormData((state) => {
      return { ...state, produtos: items };
    });
  };

  const renderOrder = () =>
    formData
      ?.sort((a, b) => a.id - b.id)
      .map((el, id) => (
        <div key={id} className={styled.orderCard}>
          <div>
            <h6>{el.titulo}</h6>
            <span>{el?.formate_price}</span>
          </div>

          <div>
            <div className={styled.orderControllers}>
              <Image
                src={
                  el.quantidade > 1
                    ? '/icons/dash-lg.svg'
                    : '/icons/trash-fill.svg'
                }
                width="14px"
                height="14px"
                alt="Icone botão"
                onClick={() => handleLessItems(el)}
              />
              <span>{el?.quantidade}</span>
              <Image
                src="/icons/plus-lg.svg"
                width="14px"
                height="14px"
                alt="Icone botão"
                onClick={() => handleMoreItems(el)}
              />
            </div>
          </div>
        </div>
      ));

  useEffect(() => {
    if (Array.isArray(formData) && !formData?.length) {
      previousStep();
    }
  }, [formData]);

  useEffect(() => {
    if (props.currentStep === 3) {
      disableButton(false);
    }
  }, [props.currentStep]);

  return (
    <>
      <div>
        <h5 className="card-title">Sacola</h5>
      </div>

      <div className={styled.cardWrapper}>{renderOrder()}</div>

      <div className="w-100 d-flex justify-content-end gap-2">
        <Button variant="outline-secondary" onClick={previousStep}>
          Voltar
        </Button>
      </div>
    </>
  );
}
