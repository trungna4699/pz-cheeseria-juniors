import { Wrapper } from "./RecentPurchases.styles";
import { useQuery } from "react-query";
import React, { useState } from 'react';
import { CartItemType } from '../App';

type Props = {
};

const getPurchases = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/purchases`)).json();

const RecentPurchases: React.FC<Props> = ({ }) => {
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

    const { data, isLoading, error } = useQuery<any[]>(
        'purchases',
        getPurchases
    );
    console.log("2nd data", data);
    
    return (
        <Wrapper>
            <h2>Recent Purchases</h2>
            {data?.length === 0 ? <p>No items in recent purchases.</p> : null}
            {data?.map((itemList, index) =>
            <Wrapper key={index.toString()}>
                <h3>Order: </h3>
                {itemList?.map((item: CartItemType, itemIndex: any) => 
                <div key={itemIndex} style={{paddingLeft:20}}>
                    <p><span data-cy={`purchased-item-${item.title}`}>{item.title}</span> x {item.amount}</p>                    
                </div>)}
                <h4>Total: ${calculateTotal(itemList).toFixed(2)}</h4>
            </Wrapper>)}
        </Wrapper>
    );
};

export default RecentPurchases;

