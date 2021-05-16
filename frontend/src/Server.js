import { Server } from "miragejs";

export function makeServer({environment = "development"} = {}) {

    let server = new Server({
        environment,
        routes() {
            this.get("/api/information", () => {
            return {
				labels: [
					{
					confidence: 94.6770248413086, 
					"name": "Candle"
					}, 
					{
					"confidence": 86.73292541503906, 
					"name": "Cat"
					}, 
					{	
					"confidence": 86.73292541503906, 
					"name": "Pet"
					}, 
					{
					"confidence": 86.73292541503906, 
					"name": "Mammal"
					}, 
					{
					"confidence": 84.13390350341797, 
					"name": "Person"
					}
				], 
				people: [
					{
						"agemin": 20, 
						"agemax": 32, 
						"Gender": "Female", 
						"Emotions": ["ANGRY"]
					}
				]
			}
	})}})
  return server;
}
        

