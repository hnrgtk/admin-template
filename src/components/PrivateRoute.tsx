import Head from "next/head";
import Image from "next/image";
import loadingGif from "../../public/loading.gif";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute(props) {
	const { loading, user } = useAuth();

	function renderContent() {
		return (
			<>
				<Head>
					<script
						dangerouslySetInnerHTML={{
							__html: `
                if(!document.cookie?.includes("auth-admin")) {
                  window.location.href = "/login"
                }
              `,
						}}
					></script>
				</Head>
				{props.children}
			</>
		);
	}

	function renderLoading() {
		return (
			<div
				className={`
        flex justify-center items-center h-screen
      `}
			>
				<Image src={loadingGif} alt="Carregando" />
			</div>
		);
	}

	if (!loading && user?.email) {
		return renderContent();
	} else {
		return renderLoading();
	}
}
