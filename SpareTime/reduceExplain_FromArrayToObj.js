let data = [{"Latitude":"17.4283466666667","Longitude":"78.5797422222222", "VehicleNumber":"TS08UA6743"},
{"Latitude":"17.4282822222222","Longitude":"78.5799111111111","VehicleNumber":"TS08UA6743"},
{"Latitude":"17.4284233333333","Longitude":"78.5797333333333","VehicleNumber":"TS08UA6745"}]

let op = data.reduce((out,{VehicleNumber,Latitude,Longitude})=>{
  console.log('raw',out,VehicleNumber)
  if(out[VehicleNumber]){
    out[VehicleNumber].push([Latitude,Longitude])
  } else {
    out[VehicleNumber] = [[Latitude,Longitude]]
  }
  return out
},{})

console.log(op)
