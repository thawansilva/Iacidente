export function Home() {
  return (
    <div className="mb-48">
      <h1 className="inline-block pb-2 text-3xl border-b-2 md:text-4xl">
        Sejam bem vindos ao dashboard IAcidentes
      </h1>
      <div className="mt-4 md:text-lg">
        <p>
          Neste dashboard você terá acesso a informações sobre acidentes que
          ocorrem em rodovias federais como:
        </p>
        <ul className="ml-5 list-disc">
          <li>Quantidade de acidentes ocorridos</li>
          <li>As principais causas de acidentes</li>
          <li>Os estados com maiores número de acidentes</li>
          <li>
            Classificação dos acidentes a respeito da presença ou não de vítimas
            feridas/fatais
          </li>
          <li>Momento do dia em que os acidentes ocorrem</li>
          <li>Condições metereológica no momento do acidente</li>
          <li>Em qual zona os acidentes mais ocorrem</li>
        </ul>
        <p className="mt-3 text-base">
          Base de dados: BAT (Boletim de Acidentes de Transito)
        </p>
        <p className="text-base">
          Fonte:{" "}
          <a
            href="https://www.gov.br/prf/pt-br/acesso-a-informacao/dados-abertos/dados-abertos-da-prf"
            referrerPolicy="no-referrer"
            target="_blank"
            className="text-gray-600 hover:underline"
          >
            Dados abertos da PRF
          </a>
        </p>
      </div>
    </div>
  );
}
