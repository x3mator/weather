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
      // sunset
      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_date =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      // sunrise
      var sunrise = data.sys.sunrise;
      var date = new Date();
      date.setTime(sunrise);
      var sunrise_date =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

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
        error: "Введите название города!",
      });
    }
  };

  render() {
    return (
      <div>
        <Info />
        <Form weatherMethod={this.gettingWeather} />
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
    );
  }
}

export default App;
