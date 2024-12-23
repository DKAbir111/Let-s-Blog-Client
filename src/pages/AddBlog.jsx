import axios from "axios";

const AddBlog = () => {

    // List of categories for the dropdown
    const categories = ['Technology', 'Health', 'Travel', 'Education', 'Lifestyle'];
    const handleSubmit = (e) => {
        e.preventDefault();
        const Form = e.target;
        const title = Form.title.value;
        const imageUrl = Form.imageUrl.value;
        const category = Form.category.value;
        const shortDescription = Form.shortDescription.value;
        const longDescription = Form.longDescription.value;
        const newBlog = { title, imageUrl, category, shortDescription, longDescription };
        console.log(newBlog);
        try {
            axios.post('http://localhost:5001/api/blog', newBlog)
                .then(res => {
                    console.log(res.data);
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-lustria font-bold mb-4 ">Add New Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                {/* Image URL Input */}
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                {/* Category Dropdown */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        name="category"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Short Description Input */}
                <div>
                    <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                        Short Description
                    </label>
                    <textarea
                        name="shortDescription"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        rows="2"
                    ></textarea>
                </div>

                {/* Long Description Input */}
                <div>
                    <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">
                        Long Description
                    </label>
                    <textarea
                        name="longDescription"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        rows="5"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full btn btn-active hover:bg-[#b28b51] hover:text-white rounded-sm"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
