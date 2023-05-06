import "./header.css"

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img
                className="headerImg"
                src="https://beckyvandijk.com/wp-content/uploads/2020/09/stock-photography-blog.jpg"
                alt=""
            />
        </div>
    )
}