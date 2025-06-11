
export interface Link {
    name: string;
    icon: string;
    linkRoute: string;
}

const linksNavbar: Link[] = [
    {
        name: "Dashboard",
        icon: "bar_chart",
        linkRoute: "/main"
    },
    {
        name: "Entregas",
        icon: "trolley",
        linkRoute: "/entregas"
    },
    {
        name: "Motoristas",
        icon: "person",
        linkRoute: "/motoristas"
    },
    {
        name: "Veiculos",
        icon: "local_shipping",
        linkRoute: "/veiculos"
    },
    {
        name: "Monitoramento",
        icon: "map",
        linkRoute: "/dashboard/monitoramento"
    },
    {
        name: "Relatórios",
        icon: "description",
        linkRoute: "/dashboard/relatorios"
    },
    {
        name: "Configurações",
        icon: "settings",
        linkRoute: "/configuracoes"
    },
    {
        name: "Ajuda",
        icon: "help_outline",
        linkRoute: "/ajuda"
    },
    {
        name: "Sair",
        icon: "logout",
        linkRoute: "**/logout"
    }
];

export default linksNavbar;