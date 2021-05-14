import { Server } from "miragejs";

export function makeServer({environment = "development"} = {}) {

    let server = new Server({
        environment,
        routes() {
            this.get("/api/information", () => {
            return {
	        // information:[{
                FaceDetails: [{
		            BoundingBox: {
			            Width: 0.08216606825590134,
			            Height: 0.21112212538719177,
			            Left: 0.44671908020973206,
			            Top: 0.07368309795856476
		            },
		            AgeRange: {
			            Low: 36,
			            High: 54
		            },
		            Smile: {
			            Value: false,
			            Confidence: 99.24573516845703
                    }
                // }]
            }]
    }})}})
  return server;
}
        

