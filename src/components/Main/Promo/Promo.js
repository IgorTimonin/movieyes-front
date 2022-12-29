import React from 'react';
import './Promo.scss';

export default function Promo(props) {
  return (
    <section className="promo" id='promo'>
      <h1 className="section__title section__title_promo">
        Этот сервис помогает искать фильмы в базе данных и сохранять их в избранное.
      </h1>
      <p className='promo__text'>Для использования сервиса необходимо пройти быструю регистрацию</p>
    </section>
  );
}