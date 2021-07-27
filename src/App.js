import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "b4c0f6c114ccc464a1e5cf48308a418e";
class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    pressure: undefined,
    error: undefined,
  };

  gettingWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;

    if (city) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await api_url.json();
      console.log(data);

      if (data.cod === 200) {
        const time = (ms) => {
          var date = new Date(ms * 1000);
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
        };
        var sunrise_date = time(data.sys.sunrise);
        var sunset_date = time(data.sys.sunset);

        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          sunrise: sunrise_date,
          sunset: sunset_date,
          pressure: data.main.pressure,
          error: undefined,
        });
      } else {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          sunrise: undefined,
          sunset: undefined,
          pressure: undefined,
          error: "Неверное название города!",
        });
      }
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        pressure: undefined,
        error: "Введите название города!",
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-4 col-lg-6 info">
                <Info />
              </div>
              <div className="col-sm-6 col-md-4 col-lg-6 form">
                <Form weatherMethod={this.gettingWeather} />
                <div className="col-sm-6 col-md-4 col-lg-6">
                  <Weather
                    temp={this.state.temp}
                    city={this.state.city}
                    country={this.state.country}
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset}
                    pressure={this.state.pressure}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
