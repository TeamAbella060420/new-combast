import './App.css';
import { useState } from 'react';
import { AiFillCaretDown, AiOutlineMessage } from "react-icons/ai";
import { Dropdown } from 'antd';
import { database } from './database';

const items  = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Edit
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Delete
      </a>
    ),
    key: '1',
  },
]

const sortDatabase = (db: any[]) => {
  return db.sort((a, b) => {
    const aLatest = a.comments.sort((c1: any, c2: any) => new Date(c2.DateTime).getTime() - new Date(c1.DateTime).getTime())[0];
    const bLatest = b.comments.sort((c1: any, c2: any) => new Date(c2.DateTime).getTime() - new Date(c1.DateTime).getTime())[0];
    return new Date(bLatest.DateTime).getTime() - new Date(aLatest.DateTime).getTime();
  });
}

const App = () => { 
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>([]);

  const handleClick = (index : number) => {
    setCurrentIndex(index === currentIndex ? null: index)
  }

// useEffect(() => {
//   handleSearch()
// },[])

  const handleSearch = () => {
    const results = database.filter((data) =>
      data.TasNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  console.log(currentIndex, 'sss');
  return (
    <>
    <div className="App">
      <h4 className='title'>Trip Log</h4>
      <div className='list__header'>
      <input
            type="text"
            placeholder="TR No"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
      />
        <button  onClick={handleSearch}>Search</button>{' '}
      </div>
      <div className='list__container'>
       {(searchResults.length > 0 ? searchResults :  sortDatabase(database)).map((data: any, index: number) => (
              <div
                className="list__item-expandable"
                onClick={() => handleClick(index)}
                key={data.TasNo}
              >
                <div className="item__header">
                  <h4 className="item__title">
                    {data.TasNo.toUpperCase()}{' '}
                    <AiFillCaretDown className="dropdown" />
                  </h4>
                   {index === currentIndex && (
                    <table className="table_chart">
                      <thead className="table">
                        <tr className="table__title">
                          <th>Date&Time</th>
                          <th>Customer</th>
                          <th>Changes</th>
                          <th>Comments</th>
                          <th className="edit__title">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.comments.map((comment: any) => (
                          <tr className="table__data">
                            <td>{comment.DateTime}</td>
                            <td>{comment.CustomerName}</td>
                            <td>{comment.ChangesText}</td>
                            <td>{comment.CommentsText}</td>
                            <Dropdown menu={{ items }}>
                              <td className="edit">
                                <AiOutlineMessage />
                              </td>
                            </Dropdown>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
            </div>
          </div>
        ))}  
      </div>
    </div>
    </>
  )
}

export default App;