import React , { useReducer, createContext, useMemo } from "react";
import Table from "./Table";
import Form from "./Form";


export const CODE = {
    MINE : -7,
    NORMAL : -1,
    QUESTION : -2,
    FLAG : -3,
    QUESTION_MINE : -4,
    FLAG_MINE : -5,
    CLICKED_MINE : -6,
    OPENED : 0, //0 이상이면 다 OPENED 상태가 되겠끔.
}

export const TableContext = createContext({
    tableData : [],
    dispatch : () => {},
});


const initialState = {
    tableData: [],
    result: '',
    timer: '',

}

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr,i) => {
       return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for(let i = 0; i < row; i++){
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k = 0; k < shuffle.length; k++){
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
}



const reducer = (state,action) => {
    switch (action.type){
        case START_GAME:
            return {
                ...state,
                tableData : plantMine(action.row, action.cell, action.mine)
            }


        default:
            return state;
    }
}

export const START_GAME = 'START_GAME';

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { tableData, result, timer } = state;

    const value = useMemo(() => ({ tableData : tableData , dispatch }), [tableData]);

    return(
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table/>
            <div>{result}</div>
        </TableContext.Provider>

    );
}

export default MineSearch;