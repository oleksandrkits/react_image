class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewImage = this.addNewImage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }
    deleteImage(id){
        const newImages = this.state.images.filter((image) => image.id !== id);
        this.setState({
            images: newImages,
        })
    }

    handleDelete(id){
        fetch(`http://localhost:3000/api/v1/images/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            this.deleteImage(id)
        })
    }

    handleFormSubmit(url){
        let body = JSON.stringify({image: {url: url} });
        fetch('http://localhost:3000/api/v1/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response) => {return response.json()})
            .then((image)=>{
                this.addNewImage(image)
            })

    }

    addNewImage(image){
        this.setState({
            images: this.state.images.push(image)
        })
    }

    componentDidMount(){
        fetch('/api/v1/images.json')
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ images: data }) });
    }
    render(){
        return(
            <div class="container">
                <NewImage handleFormSubmit={this.handleFormSubmit}/>
                <AllImages images={this.state.images} handleDelete={this.handleDelete} />
            </div>
        )
    }
}