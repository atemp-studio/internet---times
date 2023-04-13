export const Window = ({ children }: any) => {
	return (
		<div className="window">
			<div className="window-body">
				{children}
			</div>
		</div>
	)
}