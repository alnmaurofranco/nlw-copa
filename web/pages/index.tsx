import { GetServerSideProps } from "next"

type HomeProps = {
  count: number;
}

export default function Home(props: HomeProps) {
  return (
    <h1>Next.js + Copa {props.count}</h1>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch('https://6258618d0c918296a496355f.mockapi.io/api/export')
  const data = await response.json();

  return {
    props: {
      count: Number(data[0].id)
    }
  }
}