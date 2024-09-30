1.1 Functional Requirements
1.1.1 Data Upload
The system must allow users to upload CSV files.
The system must validate the file structure and provide error messages for incorrect formats.
Users must be able to preview uploaded data before analysis.
1.1.2 Variable Selection
The system must provide a graphical interface to select predictor variables and the target variable.
1.1.3 Predictive Model Configuration and Execution
The system must allow users to choose between regression and classification models based on the target variable.
The system must recommend suitable models based on the type of problem (regression or classification).
1.1.4 Model Training and Evaluation
The system must train the selected model using the provided data.
It must generate performance metrics (e.g., accuracy, recall, R²) and provide visualizations for evaluation.
1.1.5 Variable Importance Analysis
The system must perform an analysis of the importance of predictor variables in relation to the target variable.
The analysis results must be displayed in easy-to-interpret graphs and tables.
1.1.6 Results Visualization and Exportation
The system must display model results through a clear graphical interface with interactive visualizations.
Users must be able to export results and visualizations in formats like PDF.
1.1.7 Educational Support and Documentation
The system must include accessible documentation to guide users on how to use the platform.

1.2 Non-Functional Requirements
1.2.1 Performance
The application must maintain fast and consistent response times, even with multiple concurrent users.
1.2.2 Usability
The user interface must adhere to Google Material 3 design principles, ensuring consistency and accessibility.
The application should be intuitive and easy to use, even for users with limited knowledge of data analysis.
1.2.3 Reliability
The application must be available 24/7 and include protocols for efficient failure handling.
1.2.4 Compatibility
The application must be compatible with modern web browsers (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
It must adjust well to various screen resolutions and devices, including mobile and tablet.
1.2.5 Maintenance
The source code must be well-structured and documented for easy maintenance and updates.
The system must be modular to allow for adding new features or updating existing ones without affecting overall stability.
