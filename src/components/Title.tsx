type TitleProps = {
  title: string;
  subtitle: string;
};

export function Title(props: TitleProps) {
  return (
    <div>
      <h1
        className={`
        font-black md:text-3xl text-gray-900
				xs:text-base
        dark:text-gray-100
      `}
      >
        {props.title}
      </h1>
      <h2
        className={`
        	font-light md:text-sm text-gray-600
        dark:text-gray-300
					xs:text-xs
        `}
      >
        {props.subtitle}
      </h2>
    </div>
  );
}
