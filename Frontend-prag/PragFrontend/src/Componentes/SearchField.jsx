const SearchField = (props) => {
	
	return(
		<div className="form form--search">
			<div className="form__field">
				<input
					type="text"
					className="form-control"
					id="search"
					value={props.filter || ''}
					placeholder="Search"
					onChange={(e)=> props.setFilter(e.target.value)}
				/>
			</div>
		</div>
	)
}

export default SearchField;