import { useGetLaunchesQuery, useGetRocketsQuery } from '../../store/apiSpaceX';
import { useEffect, useState } from 'react';
import './Table.css';

export const Table = () => {
  const { data = {} } = useGetLaunchesQuery();
  const dataRockets = useGetRocketsQuery();
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    if(data.docs !== undefined && dataRockets !== undefined) {
      const newDataLaunches = data.docs.map(item => {
        const rocket = dataRockets.data.find(rocket => rocket.id === item.rocket);
        return {...item, imageRocket: rocket.flickr_images[0]}
      });
      setLaunches(newDataLaunches)
    };
  }, [data, dataRockets]);

  function clickDate() {
    setLaunches(prevState => {
      const newState = [...prevState];
      return newState.reverse();
    });
  }

  return(
    <table className='table'>
      <caption className='table__caption'>Успешные космические миссии SpaceX за 2015-2019 года</caption>
      <thead>
        <tr>
          <th className='table__item table__item_type_head'>Название миссии</th>
          <th className='table__item table__item_type_head table__item_type_date' onClick={clickDate}>Дата запуска</th>
          <th className='table__item table__item_type_head'>Информация о запуске</th>
          <th className='table__item table__item_type_head'>Ракета</th>
        </tr>
      </thead>
      <tbody>
        {
          launches &&
            launches.map((item) => {
                return(
                  <tr className='table__row' key={item.id}>
                    <td className='table__item'>{item.name}</td>
                    <td className='table__item'>{item.date_utc}</td>
                    <td className='table__item'>{item.details}</td>
                    <td className='table__item'><img className='table__image' src={item.imageRocket} alt="изображение ракеты"/></td>
                  </tr>
                )
              })
        }
      </tbody>
    </table>
  )
};