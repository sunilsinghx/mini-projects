export interface WeatherData{
    name:string
    main:{
        temp:number
        humidity:number
    }
    weather:{
        description:string
        icon:string
    }[]
}


export interface ForecastItem{
    dt_txt : string
    main :{
        temp:number
    }
    weather:{
        main: string | undefined
        description:string
        icon:string
    }[]
}