import cors from 'cors';

const corsConfig = cors({
  methods: ["GET", "POST", "HEAD"],
  origin: ["localhost:8080"]
})

export default corsConfig