import { GetServerSideProps } from "next"
import Image from 'next/image'

import logotipoImage from '../assets/logotipo.svg'
import fundoImage from '../assets/fundo-copa.png'
import appPreviewImage from '../assets/app-preview-copa.png'
import usersAvataresExampleImage from '../assets/users-avatares-example.png'
import iconCheckImage from '../assets/icon-check.svg'
import { api } from "../lib/axios"
import { FormEvent, useState } from "react"

type CountResponse = {
  count: number;
}

export type HomeProps = {
  pollCount: number
  guessCount: number
  userCount: number
}

export default function Home(props: HomeProps) {
  const [pollTitle, setPollTitle] = useState('')

  async function createPoll(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post<{ code: string }>('/polls/create', {
        title: pollTitle
      });
      const { code } = response.data;
      navigator.clipboard.writeText(code)
      alert(`Você acabou de criar seu bolão com sucesso, o código do seu bolão é: ${code}`)
      setPollTitle('')
    } catch (error) {
      alert('Falha ao criar o bolão tente novamente mais tarde!')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image
          src={logotipoImage}
          alt="Logotipo da NLW Copa"
        />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src={usersAvataresExampleImage}
            alt=""
          />
          <strong className="text-gray-100 text-xl">
            <span className="text-copa-500">+{props.userCount}</span> pessoas já estão participando!
          </strong>
        </div>

        <form className="mt-10 flex gap-2" onSubmit={createPoll}>
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            placeholder="Qual nome do seu bolão?"
            required
            value={pollTitle}
            onChange={event => setPollTitle(event.target.value)}
          />
          <button
            className="bg-nlw-500 px-6 py-4 rounded font-bold uppercase text-sm text-gray-900 hover:bg-nlw-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image
              src={iconCheckImage}
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.pollCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image
              src={iconCheckImage}
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImage}
        alt="Dois celulares exibindo uma previa da aplicação movel do NLW Copa"
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const [pollCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get<CountResponse>('/polls/count'),
    api.get<CountResponse>('/guesses/count'),
    api.get<CountResponse>('/users/count')
  ]);

  return {
    props: {
      pollCount: pollCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }
}