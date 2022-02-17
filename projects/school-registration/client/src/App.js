import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    const [data, setData] = React.useState(null);

    
    React.useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "React POST Request Example" }),
        };

        fetch("/api", requestOptions)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Status:  ' + res.status)
                }
                console.log("Status der Anfrage: " + res.status)
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setData("Vielen Dank");
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>{!data ? "Loading..." : data}</p>
            </header>
        </div>
    );
}

export default App;
