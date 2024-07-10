import { DataPokemon } from '@/app/interface';
import React, { useState } from 'react';
interface Props {
  listData: DataPokemon[];
}
const CardPokemon: React.FC<Props> = (props) => {
  const { listData } = props;
  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {listData?.length > 0 &&
        listData?.map((item, index) => (
          <div
            key={item?.id || index}
            className="p-3 bg-slate-100 max-w-[150px] w-full flex items-center flex-col rounded-sm"
          >
            <div className="img ">
              <img src={item?.sprites?.front_default} alt="img" />
            </div>
            <p>{item?.name}</p>
          </div>
        ))}
    </div>
  );
};

export default CardPokemon;
