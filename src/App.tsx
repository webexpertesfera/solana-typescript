import { useEffect, useState } from 'react'
import './App.css'
import { SolanaAccountManager } from './SolanaAccountManager.ts'
import { ComparisonResult } from './types/ComparisonResult.ts'

function App() {
  const [compareBalances, setCompareBalances] = useState<ComparisonResult>();

  const fetchBalance = async () => {
    const manage = new SolanaAccountManager();
    const tokens = await manage.compareBalances('ab', 'cd');
    setCompareBalances(tokens);
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      <div className='m-5'>
        <div className="row">
          <div className="col-4">
            <ul className="list-group">
              <li className="list-group-item active">First Account</li>
              {compareBalances?.account1Only.map(i => (<li className="list-group-item d-flex justify-content-between align-items-center">
                {i.name}
                <span className="badge text-bg-primary rounded-pill">{i.balance}</span>
              </li>))}
            </ul>
          </div>
          <div className="col-4"><ul className="list-group">
            <li className="list-group-item active">Second Account</li>
            {compareBalances?.account2Only.map(i => (<li className="list-group-item d-flex justify-content-between align-items-center">
              {i.name}
              <span className="badge text-bg-primary rounded-pill">{i.balance}</span>
            </li>))}
          </ul></div>
          <div className="col-4"><ul className="list-group">
            <li className="list-group-item active">Common</li>
            {compareBalances?.commonTokens.map(i => (<li className="list-group-item d-flex justify-content-between align-items-center">
              {i.name}
              <span className="badge text-bg-primary rounded-pill">{i.balance}</span>
            </li>))}
          </ul></div>
        </div>

      </div>
    </>
  )
}

export default App
