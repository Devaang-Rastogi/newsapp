import loading from './hold-on.gif'

const Spinner = () => {
    return (
      <div className="text-center">
        <img src={loading} alt="loading" height={48} width={48} />
      </div>
    )
}

export default Spinner