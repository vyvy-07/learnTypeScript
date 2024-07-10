'use client';
import CardPokemon from '@/components/CollectionPokemon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataPokemon } from './interface';
interface Data {
  name: string;
  url: string;
}
// interface DataPokemon {
//   id: number;
//   name: string;
//   sprites: {
//     front_default: string;
//   };
// }
const Home: React.FC = () => {
  const [listData, setListData] = useState<DataPokemon[]>([]);
  const [linkNext, setLinkNext] = useState<string>('');
  useEffect(() => {
    const getListPokemon = async () => {
      try {
        const res = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20'
        );
        if (res?.data) {
          setLinkNext(res?.data.next);
          res?.data?.results.forEach(async (item: Data) => {
            const dataItem = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${item?.name}`
            );
            setListData((p) => [...p, dataItem?.data]);
          });
        }
      } catch (error) {
        console.log('error :>> ', error);
      }
    };
    getListPokemon();
  }, []);
  const handleViewMore = async (url: string) => {
    try {
      const res = await axios.get(` ${url}`);
      if (res?.data) {
        setLinkNext(res?.data.next);
        res?.data?.results.forEach(async (item: Data) => {
          const dataItem = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${item?.name}`
          );
          setListData((p) => [...p, dataItem?.data]);
        });
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="">
        <header className="block my-4 text-3xl text-emerald-100 font-bold text-center">
          POKEMON
        </header>

        <CardPokemon listData={listData} />
        <button
          className="w-[150px] block my-4 bg-slate-100 mx-auto p-3"
          onClick={() => handleViewMore(linkNext)}
        >
          View more
        </button>
      </div>
    </div>
  );
};
export default Home;
