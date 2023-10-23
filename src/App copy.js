import { useState, useEffect } from 'react';

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [[selCoinID, selCoin], setSelectCoin] = useState([null, null]);
    const onCoinChagne = (event) => {
        const coinID = event.target.value;
        setSelectCoin([coinID, coins.find((item) => item.id === coinID)]);
    };

    const [inputUSD, setUSD] = useState(20);
    const onUSDChagne = (event) => {
        setUSD(event.target.value);
    };

    useEffect(() => {
        fetch('https://api.coinpaprika.com/v1/tickers?limit=10')
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setSelectCoin([json[0].id, json[0]]);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            <h1>The Coins {loading || `(count : ${coins.length})`}</h1>
            {loading ? (
                <strong>Loading....</strong>
            ) : (
                <>
                    <select value={selCoinID} onChange={onCoinChagne}>
                        {coins.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name} ({item.symbol}) $
                                {item.quotes.USD.price} USD
                            </option>
                        ))}
                    </select>
                    <br />
                    <label>
                        <input
                            type="number"
                            name="USD"
                            value={inputUSD}
                            onChange={onUSDChagne}
                        />
                        USD
                    </label>
                    {' => '}
                    <label>
                        <input
                            type="number"
                            value={
                                selCoin &&
                                selCoin.quotes.USD &&
                                selCoin.quotes.USD.price % inputUSD
                            }
                            readOnly
                        />
                        {`(${selCoin && selCoin.symbol})`}
                    </label>
                </>
            )}
        </div>
    );
}

export default App;
