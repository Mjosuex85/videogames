import React from 'react';
import style from './pagination.module.css'



export default function Pagination({ allRecipes, pageSize, page, goToPreviousPage, goToNextPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allRecipes / pageSize); i++) {
        pageNumbers.push(i);;
    }
    return (
        <nav >
            <div >
                <button className={style.btnNextPrev} onClick={(e) => goToPreviousPage(e)}>Prev</button>
                {pageNumbers && pageNumbers.map(number => {
                    return (
                        <ul key={number}>
                            <button  onClick={() => page(number)}>{number}</button>
                        </ul>
                    )
                })}
                <button className={style.btnNextPrev} onClick={(e) => goToNextPage(e)}>Next</button>
            </div>
        </nav>
    );
}