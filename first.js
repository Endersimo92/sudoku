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

            for (let i = 1; i <= this._righe; i++)
            {
                for (let j = 1; j <= this._colonne; j++)
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
        let sudoku = [];
        for (let i = 1; i <= this._colonne; i++)
        {
            let disponibili = [1,2,3,4,5,6,7,8,9];
            for (let j = 1; j <= this._righe; j++)
            {
                let notUsable = [];
                let random = Math.floor((Math.random() * disponibili.length));
                let index = 0;
                
                /* Controllo le righe, se 2 num sono uguali cambio il random (togliendo la possibilitá di essere uguale a prima) e ricontrollo */ 
                for (let s = j; s > 1; s--)
                {
                    /* if (sudoku[i-1].includes(document.getElementById(s - 1 + "-" + i).value) */ /* || sudoku[i-1].includes(document.getElementById(j + "-" + i).value) */ 
                    if ((document.getElementById(j + "-" + i).value == document.getElementById((s - 1) + "-" + i).value))
                    {
                        disponibili.splice(random, 1);
                        console.log(disponibili);
                        random = Math.floor((Math.random() * disponibili.length));
                        notUsable[index] = document.getElementById((s - 1) + "-" + i).value;
                        s = j;
                        index ++;
                    }
                }
                for(let x = i; x > 1; x--)
                {
                    if ((document.getElementById(j + "-" + i).value == document.getElementById(j + "-" + (x - 1)).value))
                    {
                        disponibili.splice(random, 1);
                        console.log(disponibili);
                        random = Math.floor((Math.random() * disponibili.length));
                        notUsable[index] = document.getElementById(j + "-" + (x - 1)).value;
                        x = i;
                        index ++;
                    }
                }
               /*  disponibili = notUsable.reduce((b, a) => {
                    if (b.includes(a)) {
                      b.splice(b.indexOf(a), 1);
                    }
                    return b;
                  }, [...disponibili]);

                console.log(disponibili); */
                document.getElementById(j + "-" + i).value = disponibili[random];
                document.getElementById(j + "-" + i).readOnly = true;
                disponibili.splice(random, 1);
                console.log(disponibili);
            }
            /* switch (i) 
            {
                case 1:
                    for (let j = 1; j <= this._colonne; j++)
                    {
                        let random = Math.floor((Math.random() * disponibili.length));
                        document.getElementById(i + "-" + j).value = disponibili[random];
                        document.getElementById(i + "-" + j).readOnly = true;
                        disponibili.splice(random, 1);
                    }
                    break;
                default:
                    for (let j = 1; j <= this._colonne; j++)
                    {
                        let random = Math.floor((Math.random() * disponibili.length));
                        random = this.#isInColumn(random, j, disponibili, i);
                        document.getElementById(i + "-" + j).value = disponibili[random];
                        document.getElementById(i + "-" + j).readOnly = true;
                        disponibili.splice(random, 1);
                    }
                    break; 
            } */
            
        }
        console.log(sudoku);
    }

    /* #isInColumn(random, riga, disponibili, colonna)
    {
        for (let i = riga; i > 1; i--)
        {
            while(document.getElementById(i - 1 + "-" + colonna).value == disponibili[random])
            {
                random = Math.floor((Math.random() * disponibili.length));
                i = riga;
            }
        }

        return random;
    } */
}

let sudoku = new Sudoku(9, 9);
sudoku.createTable();