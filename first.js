/* Classi */
class Sudoku
{
    #min_clues = 17;
    constructor(colonne, righe)
    {
        this._colonne = colonne;
        this._righe = righe;
    }

    get righe()
    {
        return this._righe;
    }
    set righe(value)
    {
        if(value < 1 || isNaN(value) || (value % 3) != 0)
            return -1;
        else
            this._righe = value;
    }

    get colonne()
    {
        return this._colonne;
    }
    set colonne(value)
    {
        if(value < 1 || isNaN(value) || (value % 3) != 0)
            return -1;
        else
            this._colonne = value;
    }

    createTable()
    {
        /* Genero la tabella */
        document.addEventListener('DOMContentLoaded', (event) => {
            const sudokuGrid = document.querySelector('.table');

            for (let i = 1; i <= this._colonne; i++)
            {
                for (let j = 1; j <= this._righe; j++)
                {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.min = 1;
                    input.max = 9;
                    input.id = i + "-" + j;
                    input.className = "cell";
                    input.addEventListener('input', (e) => {
                        if (e.target.value > 9) 
                            e.target.value = 9;
                        if (e.target.value < 1) 
                            e.target.value = '';
                    });
                    sudokuGrid.appendChild(input);
                }
                
            }
        }); 
    }

    /* Sudoku */
    genSudoku()
    {
        const sudokuGrid = document.querySelector('.table');
        for (let i = 1; i <= this._colonne; i++)
        {
            for (let j = 1; j <= this._righe; j++)
            {
                document.getElementById(i + "-" + j).value = Math.floor(Math.random()* (9 - 1) + 1);
                document.getElementById(i + "-" + j).readOnly = true;
            }
            
        }
    }
}

let sudoku = new Sudoku(9, 9);
sudoku.createTable();