import Header from "@/app/components/Header/Header";
import AuthInitializer from "@/app/components/AuthInitializer/AuthInitializer";
import Footer from "@/app/components/Footer/Footer";

const MainPage = ({
                      children,
                  }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Header/>
            <AuthInitializer/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
};

export default MainPage;